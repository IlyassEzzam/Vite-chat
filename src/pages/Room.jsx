import { useState, useEffect } from 'react' // function react
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES} from '../appwriteConfig'
import { Trash2 } from "react-feather"; // icon react feather
import { ID, Query, Permission, Role } from "appwrite"; //function in appWrite

import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext';

const Room = () => {

  const {user} = useAuth()

  const [ messages, setMessages ] = useState([]);// code message
  const [messageBody, setMessageBody] = useState("");  // add message new in database appWite 


  useEffect(() => {
    getMessages()
  })


  // Start fetch data in appWrite 
  const getMessages = async () => {
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        [
          Query.orderDesc("$createdAt"),
          Query.limit(100),
        ]
    );
    // console.log(response.documents);
    setMessages(response.documents);
};
  // End fetch data in appWrite 

  //Start add new data after submit in appWrite
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Message => " ,messageBody);

    const payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    }

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
    )
    console.log("RESPONSE => ", response);
    setMessageBody("");
  }
  //End add new data after submit in appWrite


  //Start Delete messagesBody
  const deleteMessage = async(id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
  }
  //End Delete messagesBody

  return (
    <main className='container'>
      <div className='room--container'>

      <Header />

        <form id='message--form' onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength={`250`}
              placeholder='Say something ...'
              className='message--textarea'
              value={messageBody}
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
            >
            </textarea>
          </div>

          <div className='send-btn--wrapper'>
            <input className='btn btn--secondary' type="submit" value="Send" />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className='message--wrapper'>
              
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <span 
                    className={
                      "message--name" +
                      (message.user_id === user.$id ? " message--body--name" : "")
                  }
                    > {message?.username}</span>
                  ) : (
                    "Anonymous user"
                  )}

                  <small className="message-timestamp">
                    {" "}
                      {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </p>

                {message.$permissions.includes(
                  `delete(\"user:${user.$id}\")`
                ) && (
                  <Trash2
                    className="delete--btn"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                )}
              </div>



              <div
                className={
                    "message--body" +
                    (message.user_id === user.$id ? " message--body--owner" : "")
                }
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Room