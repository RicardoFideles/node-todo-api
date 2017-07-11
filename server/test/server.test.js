const expect = require('expect');
const request = require('supertest');

var { app } = require('./../server');
var { Todo } = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
    {
        _id : new ObjectID(),
        text: 'First test todo'
    },
    {
        _id : new ObjectID(),
        text: 'Second test todo',
        completed : true,
        completedAt : 333
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test code';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var ID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${ID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-objects ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID =  todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexID =  new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        var hexID =  123;
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexID =  todos[0]._id.toHexString();
        var body =  {'text' : 'text is change', 'completed' : true};
        request(app)
            .patch(`/todos/${hexID}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });
    
    it('should clear completedAT when todo is not completed', (done) => {
        var hexID =  todos[0]._id.toHexString();
        var body =  {'text' : 'text is change'};
        request(app)
            .patch(`/todos/${hexID}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });

    it('should return 404 when id is invalid', (done) => {
        var hexID =  123;
        request(app)
            .patch(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 when todo is not found', (done) => {
        var hexID =  new ObjectID().toHexString();
        request(app)
            .patch(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });
});