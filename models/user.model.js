const connect = require("../config/connect");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class User {
  async createUser(firstname, lastname, gender, email, password, number) {
    //console.log(password);
    const hash = await bcrypt.hash(password, 10);
    const sql = `insert into registration(firstName, lastName, gender, email, password, number)
                      values('${firstname}','${lastname}','${gender}','${email}','${hash}','${number}')`;
    const response = await connect.promiseQuery(sql);
    return response;
  }

  async getUsersByUserId(id) {
    const sql = `select * from registration where id = '${id}'`;
    const response = await connect.promiseQuery(sql);
    if (!response[0]) {
      return {
        success: 0,
        message: "User not Found",
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
    const hash = await bcrypt.hash(password, 10);
    const sql = ` UPDATE registration
                  SET
                      firstName = '${first_name}',
                      lastName = '${last_name}',
                      gender = '${gender}',
                      email = '${email}',
                      password = '${hash}',
                      number = '${number}'
                  WHERE id = '${id}'`;
    const response = await connect.promiseQuery(sql);
    return {
      success: 1,
      message: "updated successfully",
    };
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

  async loginUser(email, password) {
    const sqlFindEmail = `select * from registration where email = '${email}'`;
    const responseFindEmail = await connect.promiseQuery(sqlFindEmail);
    if (responseFindEmail[0]) {
      const match = bcrypt.compare(password, responseFindEmail[0].password);
      if (match) {
        const jsontoken = sign({ result: responseFindEmail }, "qwe1234", {
          expiresIn: "1h",
        });
        return {
          success: 1,
          message: "login successfully",
          token: jsontoken,
        };
      } else {
        return {
          success: 0,
          data: "Invalid email or password",
        };
      }
    }
  }
}

module.exports = User;
