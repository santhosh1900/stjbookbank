import { io } from "socket.io-client";
import { AddNotification } from "./action";
const url  = "https://stjbookbankbackend.herokuapp.com";
// const url = "http://localhost:3001";


var Socket;

export const socketConnection = async (userdata, dispatch) => {
    userdata = await JSON.parse(userdata);
    Socket   = await io(url, {
        withCredentials: true,
    });
    await Socket.emit("join_room", {
        room : userdata.Email
    });
    await Socket.on("Booksubmitted", async (data)=> {
      if(typeof dispatch === 'function'){
        await(dispatch(AddNotification(data)));
      } 
    });
    console.log("initlized socket");
};

export const SocketSendBookReceived = async(email, data) => {
    try{
      await Socket.emit("SendBookReceived",{
        room : email,
        data
      });
      console.log("sent");
      return 0;
    }catch(err){
      console.log(err);
    }
}