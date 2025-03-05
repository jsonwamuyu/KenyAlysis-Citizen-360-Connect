interface WelcomeMessageProps {
  username: string;
}

function WelcomeMessage({ username }: WelcomeMessageProps) {
  return (
    <div className="w-full my-4">
      <div className="container">
        <h3 className="text-2xl">
          Hello,{" "}
          <span className="font-semibold text-green-600"> {username}! </span>👋
        </h3>
        <p className="text-sm">Welcome back! We are glad to have you.</p>
      </div>
    </div>
  );
}

export default WelcomeMessage