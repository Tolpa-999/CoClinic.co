import Home from "../components/chat/HomeChat"

const LiveChat = () => {
  return (
    <div className="min-h-screen bg-[url('/livechat.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-white bg-opacity-70 min-h-screen">
        <Home />
      </div>
    </div>
  )
}

export default LiveChat
