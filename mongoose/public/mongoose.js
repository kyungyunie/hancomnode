// 사용자 로딩
async function getUser(id) {
  try {
    const res = await axios.get(`/users/${id}`);
    const users = res.data;
    console.log(users);
  } catch (err) {
    console.error(err);
  }
}

// 사용자 등록
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  if (!age) {
    return alert('나이를 입력하세요');
  }
  try {
    await axios.post('/users', { name, age, married });
    getUsers();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});

// 사용자 수정
async function editUser(id) {
  const name = prompt('변경할 이름을 입력하세요');
  if (!name) {
    return alert('이름을 반드시 입력하셔야 합니다');
  }
  try {
    await axios.put(`/users/${id}`, { name });
    getUsers();
  } catch (err) {
    console.error(err);
  }
}

// 사용자 삭제
async function deleteUser(id) {
  try {
    await axios.delete(`/users/${id}`);
    getUsers();
  } catch (err) {
    console.error(err);
  }
}

// 사용자 목록 로딩
async function getUsers() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    users.map(function (user) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.married ? 'Yes' : 'No'}</td>
        <td>
          <button onclick="editUser('${user._id}')">Edit</button>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

// 초기 사용자 목록 로딩
getUsers();
