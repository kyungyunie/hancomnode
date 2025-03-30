const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger 정의
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API 문서',
      version: '1.0.0',
      description: 'REST API 엔드포인트 문서',
    },
    servers: [
      {
        url: 'http://localhost:8081',
        description: '개발 서버',
      },
    ],
  },
  apis: ['./RestAPI.js'],
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 사용자 조회
 *     description: 전체 사용자 목록을 반환합니다.
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 * 
 * /user:
 *   post:
 *     summary: 새 사용자 등록
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: 등록 성공
 * 
 * /user/{id}:
 *   put:
 *     summary: 사용자 정보 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 * 
 *   delete:
 *     summary: 사용자 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 */

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON 제공
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Swagger 문서 서버가 http://localhost:${PORT}/api-docs 에서 실행 중입니다.`);
});