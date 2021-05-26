const connect = require("../config/connect");

class User {
  async createUser(firstname, lastname, gender, email, password, number) {
    const sql = `insert into registration(firstName, lastName, gender, email, password, number)
                      values('${firstname}','${lastname}','${gender}','${email}','${password}','${number}')`;
    const response = await connect.promiseQuery(sql);
    return response;
  }

  async getUsersByUserId(id) {
    const sql = `select * from registration where id = '${id}'`;
    const response = await connect.promiseQuery(sql);
    if (!response[0]) {
      return {
        success: 0,
        message: "Record not Found",
      };
    }
    return { success: 1, message: response };
  }

  async getUsers() {
    const sql = `select * from registration`;
    const response = await connect.promiseQuery(sql);
    return response;
  }

  async getUsersByUserId(id) {
    const sql = `select * from registration where id = '${id}'`;
    const response = await connect.promiseQuery(sql);
    if (!response[0]) {
      return {
        success: 0,
        message: "Record not Found",
      };
    }
    return { success: 1, message: response };
  }

  async updateUser(id, first_name, last_name, gender, email, password, number) {
    const sql = ` UPDATE registration
                  SET
                      firstName = '${first_name}',
                      lastName = '${last_name}',
                      gender = '${gender}',
                      email = '${email}',
                      password = '${password}',
                      number = '${number}'
                  WHERE id = '${id}'`;
    const response = await connect.promiseQuery(sql);
    return response;
  }

  async deleteUser(id) {
    const sql = `DELETE FROM registration WHERE id = '${id}'`;
    const response = await connect.promiseQuery(sql);
    if (!response[0]) {
      return {
        success: 0,
        message: "Record Not Found",
      };
    }
    return {
      success: 1,
      message: "user deleted successfully",
    };
  }
}

module.exports = User;
