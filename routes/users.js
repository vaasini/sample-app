const express = require('express');
const router = express.Router();

const users = [
	{id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin'},
	{id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user'},
	{id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user'},
];

function sanitizeInput(value) {
	if (typeof value !== 'string') return value;
	return value.trim().replace(/[<>]/g, '');
}

router.get('/', (req, res) => {
	const {search} = req.query;
	if (search) {
		const term = search.toLowerCase();
		const results = users.filter(u =>
			u.name.toLowerCase().includes(term) ||
			u.email.toLowerCase().includes(term)
		);
		return res.json(results);
	}
	res.json(users);
});

router.get('/:id', (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user) return res.status(404).json({error: 'User not found'});
	res.json(user);
});

router.post('/', (req, res) => {
	const {name, email, role = 'user'} = req.body;
	if (!name || !email) {
		return res.status(400).json({error: 'name and email are required'});
	}
	const sanitizedName = sanitizeInput(name);
	const sanitizedEmail = sanitizeInput(email);
	const newUser = {id: users.length + 1, name: sanitizedName, email: sanitizedEmail, role};
	users.push(newUser);
	res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
	const index = users.findIndex(u => u.id === parseInt(req.params.id));
	if (index === -1) return res.status(404).json({error: 'User not found'});
	users[index] = {...users[index], ...req.body};
	res.json(users[index]);
});

router.delete('/:id', (req, res) => {
	const index = users.findIndex(u => u.id === parseInt(req.params.id));
	if (index === -1) return res.status(404).json({error: 'User not found'});
	const deleted = users.splice(index, 1);
	res.status(200).json({message: 'User deleted', user: deleted[0]});
});

module.exports = router;
