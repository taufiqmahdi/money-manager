const register = async (userData) => {
  const response = "";

  return response;
};

const login = async (userData) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: userData.email,
    password: userData.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("http://localhost:4001/login", requestOptions);
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.log("error", error));

  // const data = async () => {

  let data = await response.json();

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  //   try {
  //     //   data = JSON.stringify(data);
  //     //   data = JSON.parse(data);
  //     //   setUser(data);
  //     // return data;
  //     //   setIsLoggedIn(true);
  //     // localStorage.setItem("user", JSON.stringify(data));
  //   } catch (error) {
  //     // console.log(error);
  //     // setIsError(true);
  //   }
  // };

  return data;
};

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService