import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { authenticateLogin, authenticateSignup } from "../../service/api";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
  padding: 0;
  padding-top: 0;
`;

const Image = styled(Box)`
  height: 100%;
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  width: 30%;
  padding: 0px 35px;
  & > p,
  & > h5 {
    color: #fff;
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  overflow: auto;
  flex: 1;
  & > div,
  & > button,
  & > p {
    margin-top: 10px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  &:hover {
    background: #fb641b;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.4);
  }
  height: 48px;
  border-radius: 2px;
`;
const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 /0.4);
  // box-shadow:0  2px 4px rgba(0,0,0,.12), 0 -2px 4px rgba(0,0,0,.08);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Error=styled(Typography)`
   font-size:10px;
   color:#ff6161;
   line-height:0;
   margin-top:10px;
   font-weight:600;
`

const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: " Get access to your Orders, Wishlist and Recommandation",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subHeading: "Sign up with your mobile number to get started",
  },
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitialValues={
  username:"",
  password:""
};

export default function LoginDialog({ open, setOpen }) {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues); //to store the Signup Data*
  const [login,setLogin]=useState(loginInitialValues);
  const [error,setError]=useState(false);


  const { setAccount } = useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    setError(false);
    toggleAccount(accountInitialValues.login);
  };

  const setSignUp = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const onInputChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value }); //[]? ans=using variable as a key
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup); // exporting signup object which contain signup info
    if (!response) return;

    handleClose(); //response ana is good
    setAccount(signup.firstname);
  };

  const onValueChange=(event)=>{
    setLogin({...login,[event.target.name]:event.target.value});
  };

  const loginUser=async()=>{
    let response=await authenticateLogin(login);  //login frontend se jara hai and respnose backend se ara hai 
    // console.log(response);
    if(response.status===200){
      handleClose();
      setAccount(response.data.data.firstname);
      setError(false);
  }else{
      setError(true);
  }
}

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          {/* loginimage */}
          <Image>
            <Typography variant="h5" style={{ marginTop: 30 }}>
              {account.heading}
            </Typography>
            <Typography
              style={{ marginTop: 20, color: "rgba(255,255,255,0.7)" }}
            >
              {account.subHeading}
            </Typography>
          </Image>

          {/* login */}
          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(event) => onValueChange(event)}
                name="username"
                label="Enter Username"
              />
              
              <TextField
                variant="standard"
                onChange={(event) => onValueChange(event)}
                name="password"
                label="Enter Password"
              />
              {error&&
              <Error>Please enter valid username or password</Error> }
              <Text>
                By continuing , you agree to Flipkart's Terms of Use and Privacy
                Policy .
              </Text>
              <LoginButton onClick={()=>loginUser()} >Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={() => setSignUp()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            // SignUp
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="firstname"
                label="Enter FirstName"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="lastname"
                label="Enter LastName"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="username"
                label="Enter Username"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="password"
                type="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(event) => onInputChange(event)}
                name="phone"
                label="Enter Phone No. "
              />

              <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
}
