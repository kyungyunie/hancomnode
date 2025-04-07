const { scheduleJob } = require('node-schedule');
const { Op } = require('sequelize');
const { Good, Auction, User, sequelize } = require('./models');

module.exports = async () => {
  console.log('checkAuction');
  try {
    const yesterday = new Date();
    yesterday.setMinutes(yesterday.getMinutes() - 1); // One minute ago
    const targets = await Good.findAll({ // Find auctions without winners after 1 minute
      where: {
        SoldId: null,
        createdAt: { [Op.lte]: yesterday },
      },
    });
    
    // Promise.all을 사용하여 모든 비동기 작업을 병렬로 처리
    await Promise.all(targets.map(async (good) => {
      const success = await Auction.findOne({
        where: { GoodId: good.id },
        order: [['bid', 'DESC']],
      });
      
      if (!success) {
        console.log(`No bids found for good ${good.id}`);
        return;
      }
      
      try {
        await good.setSold(success.UserId);
        await User.update({
          money: sequelize.literal(`money - ${success.bid}`),
        }, {
          where: { id: success.UserId },
        });
      } catch (error) {
        console.error(`Error processing good ${good.id}:`, error);
      }
    }));

    const ongoing = await Good.findAll({ // Find ongoing auctions within 24 hours
      where: {
        SoldId: null,
        createdAt: { [Op.gte]: yesterday },
      },
    });
    
    ongoing.forEach((good) => {
      const end = new Date(good.createdAt);
      end.setMinutes(end.getMinutes() + 1); // Auction ends 1 minute after creation
      const job = scheduleJob(end, async() => {
        try {
          const success = await Auction.findOne({
            where: { GoodId: good.id },
            order: [['bid', 'DESC']],
          });
          
          if (!success) {
            console.log(`No bids found for good ${good.id}`);
            return;
          }
          
          await good.setSold(success.UserId);
          await User.update({
            money: sequelize.literal(`money - ${success.bid}`),
          }, {
            where: { id: success.UserId },
          });
        } catch (error) {
          console.error(`Error processing scheduled good ${good.id}:`, error);
        }
      });
      job.on('error', (err) => {
        console.error('Scheduling Error', err);
      });
    });
  } catch (error) {
    console.error('Error in checkAuction:', error);
  }
};
