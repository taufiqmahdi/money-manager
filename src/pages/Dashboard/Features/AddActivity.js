import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const AddActivity = () => {
  const [isIncome, setisIncome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useOutletContext();
  const income = useParams();
  const navigate = useNavigate();

  const getDate = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
  
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const today =  year + "-" + month + "-" + day;

    return today
  }

  const today = getDate();

  // var today = year + "-" + month + "-" + day;

  const initialInputState = {
    detail: "",
    amount: "",
    type: "Income",
    spesificType: "",
    description: "",
    date: today,
  };

  const [inputState, setInputState] = useState(initialInputState);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const insertCashflow = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: user.email,
      detail: inputState.detail,
      cashflowType: inputState.type,
      cashflowTypeDetail: inputState.spesificType,
      amount: inputState.amount,
      description: inputState.description,
      date: inputState.date,
      token: user.token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:4001/insert",
      requestOptions
    );
    const data = await response.json();
    // console.log('fx:', data);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await insertCashflow();
    // const data = await insertCashflow();
    // console.log('hs:', data)
    setIsLoading(false);
    navigate("/cashflow");
  };

  useEffect(() => {
    if (income.activity === "outcome") {
      setisIncome(false);
      setInputState({
        ...inputState,
        type: "Outcome",
      });
    }
    // eslint-disable-next-line
  }, [income.activity]);

  return (
    <Flex
      direction="column"
      align="flex-start"
      justify="center"
      w="50%"
      bgColor="white"
      boxShadow="lg"
      p="25px"
      borderRadius="8px"
    >
      <Link to="/">
        <Button mb="25px">Go Back</Button>
      </Link>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>
            {isIncome ? "Detail Pemasukan" : "Detail Pengeluaran"}
          </FormLabel>
          {/* <FormLabel>Email</FormLabel> */}
          <Input
            id="detail"
            name="detail"
            type="text"
            value={inputState.detail}
            onChange={handleChange}
            mb="15px"
            placeholder="e.g. Kopi"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>
            {isIncome ? "Jumlah Pemasukan" : "Jumlah Pengeluaran"}
          </FormLabel>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={inputState.amount}
            onChange={handleChange}
            mb="15px"
            placeholder="e.g. 25000"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>
            {isIncome ? "Tipe Pemasukan Khusus" : "Tipe Pengeluaran Khusus"}
          </FormLabel>
          <Input
            id="spesificType"
            name="spesificType"
            type="text"
            value={inputState.spesificType}
            onChange={handleChange}
            mb="15px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Deskripsi Tambahan</FormLabel>
          <Input
            id="description"
            name="description"
            type="text"
            value={inputState.description}
            onChange={handleChange}
            mb="15px"
            placeholder="e.g. Kopi Arabika"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Tanggal</FormLabel>
          <Input
            id="date"
            name="date"
            type="date"
            value={inputState.date}
            onChange={handleChange}
            mb="25px"
          />
        </FormControl>

        <Button type="submit" mr={4}>
          {isLoading ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Flex>
  );
};

export default AddActivity;
