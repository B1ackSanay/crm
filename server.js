const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

const ALL_PAGES = ['Заявки', 'Расписание', 'Роли и права', 'Конфигурация', 'Сделки', 'Звонки'];

app.use(bodyParser.json());

app.set('trust proxy', 1);

app.use(session({
  secret: 'очень_при-очень-Сложная-штук',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function getUsers() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf8'));
}

function getRoles() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data/roles.json'), 'utf8'));
}

function saveRoles(roles) {
  fs.writeFileSync(path.join(__dirname, 'data/roles.json'), JSON.stringify(roles, null, 2), 'utf8');
}

function excludeTechAdmin(roles) {
  const { tech_admin, ...rest } = roles;
  return rest;
}

function requirePageAccess(pageName) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Не авторизован' });
    }

    const roles = getRoles();
    const roleConfig = roles[req.session.user.role];

    if (!roleConfig || !(roleConfig.pages || []).includes(pageName)) {
      return res.status(403).json({ error: 'Недостаточно прав' });
    }

    next();
  };
}

app.post('/api/login', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: 'Логин и пароль обязательны' });
  }

  const users = getUsers();
  const foundUser = users.find(u => u.login === login && u.password === password);

  if (!foundUser) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  req.session.user = {
    id: foundUser.id,
    login: foundUser.login,
    role: foundUser.role
  };

  const roles = getRoles();
  const roleConfig = roles[foundUser.role];

  res.json({
    success: true,
    user: req.session.user,
    pages: roleConfig ? roleConfig.pages : []
  });
});

app.get('/api/session', (req, res) => {
  if (!req.session.user) {
    return res.json({ user: null, pages: [] });
  }

  const roles = getRoles();
  const roleConfig = roles[req.session.user.role];

  res.json({
    user: req.session.user,
    pages: roleConfig ? roleConfig.pages : []
  });
});

app.get('/api/roles', requirePageAccess('Роли и права'), (req, res) => {
  res.json({ roles: excludeTechAdmin(getRoles()), pages: ALL_PAGES });
});

app.post('/api/roles', requirePageAccess('Роли и права'), (req, res) => {
  const { key, label, pages } = req.body;

  if (!key || !/^[a-z0-9_]+$/.test(key)) {
    return res.status(400).json({ error: 'Название в коде должно содержать только латинские буквы, цифры и подчёркивание' });
  }
  if (!label || !label.trim()) {
    return res.status(400).json({ error: 'Название роли обязательно' });
  }
  if (key === 'tech_admin') {
    return res.status(403).json({ error: 'Это имя зарезервировано' });
  }

  const roles = getRoles();

  if (roles[key]) {
    return res.status(409).json({ error: 'Роль с таким кодом уже существует' });
  }

  const validPages = Array.isArray(pages) ? pages.filter(p => ALL_PAGES.includes(p)) : [];
  roles[key] = { label: label.trim(), pages: validPages };
  saveRoles(roles);

  res.json({ success: true, roles: excludeTechAdmin(roles), pages: ALL_PAGES });
});

app.put('/api/roles/:key', requirePageAccess('Роли и права'), (req, res) => {
  const { key } = req.params;
  const { label, pages } = req.body;

  if (key === 'tech_admin') {
    return res.status(403).json({ error: 'Эту роль нельзя изменить' });
  }

  const roles = getRoles();

  if (!roles[key]) {
    return res.status(404).json({ error: 'Роль не найдена' });
  }

  if (label && label.trim()) roles[key].label = label.trim();
  if (Array.isArray(pages)) roles[key].pages = pages.filter(p => ALL_PAGES.includes(p));

  saveRoles(roles);
  res.json({ success: true, roles: excludeTechAdmin(roles), pages: ALL_PAGES });
});

app.delete('/api/roles/:key', requirePageAccess('Роли и права'), (req, res) => {
  const { key } = req.params;

  if (key === 'tech_admin') {
    return res.status(403).json({ error: 'Эту роль нельзя удалить' });
  }

  const roles = getRoles();

  if (!roles[key]) {
    return res.status(404).json({ error: 'Роль не найдена' });
  }

  const users = getUsers();
  if (users.some(u => u.role === key)) {
    return res.status(400).json({ error: 'Роль используется пользователями, удаление невозможно' });
  }

  delete roles[key];
  saveRoles(roles);
  res.json({ success: true, roles: excludeTechAdmin(roles), pages: ALL_PAGES });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка выхода' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`
    http://localhost:${PORT}
`);
});