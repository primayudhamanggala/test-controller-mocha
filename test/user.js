const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const User = require('../models/user')
const mongoose = require('mongoose')


chai.use(chaiHttp);

describe('Books', () => {

})
describe('Testing for User ', function() {

  it('Should Create new User', function(done) {
  chai.request('http://localhost:3000')
  .post('/users')
  .send({ name : 'Sanders', email : 'kolonel.sanders@kfc.com' })
  .end(function (err, res) {
    if (err){
      done(err)
    }else {
      res.should.have.status(200)
      expect(res.body).to.have.property('success').and.equal(true)
      expect(res.body.user.name).and.equal('Sanders')
      expect(res.body.user.email).and.equal('kolonel.sanders@kfc.com')
      done()
    }
    })
  })

  it('Should Delete a user and its true', function(done){
    User.create({
      name : 'Garurumon',
      email : 'garurumon@digimon.com'},
     function (err, user) {
      if (err){
        console.log('There was an error');
        done(err)
      }
      else{
        console.log(user._id);
        chai.request('http://localhost:3000')
            .delete('/users/' + user._id)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            done();
            });
      }
    })
  })

  it('Should GET All of User', function(done) {
  chai.request('http://localhost:3000')
  .get('/users')
  .end(function (err, res) {
      if(err){
        done(err)
      }else {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        done()
      }
    })
  })

  it('Should update a user', function(done){
    User.create({
      name : 'Bruh',
      email : 'bruh@gmail.com'},
     function (err, user) {
      if (err){
        console.log('There was an error');
        done(err)
      }
      else{
        chai.request('http://localhost:3000')
            .put('/users/' + user._id)
            .send({ name : 'Pokemon', email : 'pokemon@poke.com' })
            .end((err, res) => {
             res.should.have.status(200);
             res.body.should.have.property('success').eql(true);
            done();
            });
      }
    })
  })
})
