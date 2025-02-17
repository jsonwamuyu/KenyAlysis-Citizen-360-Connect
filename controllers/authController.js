exports.signup = async (req, res) => {
  const {email, password} = req.body;
  try {
    // Before storing user data, check whether they provide valid data
    
  } catch (error) {
    console.log('An error occurred when trying to signup.', error)
  }
};

exports.login = async (req, res) => {
    const{username, password} = req.body
};
