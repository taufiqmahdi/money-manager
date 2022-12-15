import {
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Cashflow = () => {
  const [user] = useOutletContext();
  // console.log(user)

  const [cashflowContent, setCashflowContent] = useState([{}]);

  const getDate = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const today = year + "-" + month + "-" + day;
    const firstDayOfThisMonth = year + "-" + month + "-01";

    // month = date.toLocaleString("en-US", { month: "long" });
    // console.log('date', day, 'month', month, 'year', year)
    // console.log(today)
    return { firstDayOfThisMonth, today };
  };

  const { firstDayOfThisMonth, today } = getDate();

  const [initialFilterState, setInitialFilterState] = useState({
    startDate: firstDayOfThisMonth,
    endDate: today,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setInitialFilterState({
      ...initialFilterState,
      [e.target.name]: value,
    });

    // const months = {
    //   January: "01",
    //   February: "02",
    //   March: "03",
    //   April: "04",
    //   May: "05",
    //   June: "06",
    //   July: "07",
    //   August: "08",
    //   September: "09",
    //   October: "10",
    //   November: "11",
    //   December: "12",
    // };
  };

  // const months = {
  //   January: "01",
  //   February: "02",
  //   March: "03",
  //   April: "04",
  //   May: "05",
  //   June: "06",
  //   July: "07",
  //   August: "08",
  //   September: "09",
  //   October: "10",
  //   November: "11",
  //   December: "12",
  // };

  const filterCashflow = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: user.email,
      token: user.token,
      startDate: initialFilterState.startDate,
      endDate: initialFilterState.endDate,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:4001/filtercashflow",
      requestOptions
    );
    const data = await response.json();
    setCashflowContent(data);
    // return data;
  };

  useEffect(() => {
    // const getCashflowContent = async () => {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");

    //   var raw = JSON.stringify({
    //     email: user.email,
    //     token: user.token,
    //   });

    //   var requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //   };

    //   const response = await fetch(
    //     "http://localhost:4001/cashflow",
    //     requestOptions
    //   );
    //   const data = await response.json();
    //   setCashflowContent(data);
    // };
  }, []);

  useEffect(() => {
    filterCashflow();
    // eslint-disable-next-line
  }, [initialFilterState]);

  return (
    <Flex direction="column">
      <Flex mb="25px">
        <Heading as="h2" size="md">
          Cashflow
        </Heading>
      </Flex>
      <Flex
        // maxW="100%"
        w="fit-content"
        bgColor="white"
        boxShadow="lg"
        p="25px"
        borderRadius="8px"
        direction="column"
      >
        <Flex className="filter-cashflow" mb="25px">
          <Flex direction="column">
            <FormLabel>Start Date</FormLabel>
            <Input
              placeholder="Select Date and Time"
              value={initialFilterState.startDate}
              onChange={handleChange}
              size="md"
              id="startDate"
              name="startDate"
              type="date"
              w="fit-content"
              mr="25px"
            />
          </Flex>
          <Flex direction="column">
            <FormLabel>End Date</FormLabel>
            <Input
              placeholder="Select Date and Time"
              id="endDate"
              name="endDate"
              value={initialFilterState.endDate}
              onChange={handleChange}
              size="md"
              type="date"
              w="fit-content"
            />
          </Flex>
          {/* <Flex mr="25px" direction="column">
            Year
            <Select
              variant="flushed"
              id="year"
              name="year"
              value={initialFilterState.year}
              onChange={handleChange}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Select>
          </Flex>
          <Flex direction="column">
            Month
            <Select
              variant="flushed"
              id="month"
              name="month"
              value={initialFilterState.month}
              onChange={handleChange}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Select>
          </Flex> */}
        </Flex>
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th textAlign="center">Detail</Th>
                <Th textAlign="center">Cashflow Type</Th>
                <Th textAlign="center">Cashflow Type Detail</Th>
                <Th textAlign="center">Amount</Th>
                <Th textAlign="center">Description</Th>
                <Th textAlign="center">Date</Th>
                <Th textAlign="center">Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* <Tr> */}
              {cashflowContent.map((cashflowContent) => (
                <Tr key={[cashflowContent.id]}>
                  <Td className="detail">{cashflowContent.detail}</Td>
                  <Td className="cashflowType">
                    {cashflowContent.cashflowType}
                  </Td>
                  <Td className="cashflowTypeDetail">
                    {cashflowContent.cashflowTypeDetail}
                  </Td>
                  <Td className="amount" isNumeric>
                    Rp {cashflowContent.amount}
                  </Td>
                  <Td className="description">{cashflowContent.description}</Td>
                  <Td className="date">{cashflowContent.date}</Td>
                  <Td className="balance" isNumeric>
                    Rp {cashflowContent.balance}
                  </Td>
                </Tr>
              ))}
              {/* <Td className="detail">{cashflowContent[0].detail}</Td>
                <Td className="cashflowType">{cashflowContent[0].cashflowType}</Td>
                <Td className="cashflowTypeDetail">{cashflowContent[0].cashflowTypeDetail}</Td>
                <Td className="amount" isNumeric>
                  Rp {cashflowContent[0].amount}
                </Td>
                <Td className="description">{cashflowContent[0].description}</Td>
                <Td className="date">{cashflowContent[0].date}</Td>
                <Td className="balance" isNumeric>
                  Rp {cashflowContent[0].balance}
                </Td> */}
              {/* </Tr> */}
            </Tbody>
            <Tfoot>
              <Tr>
                {/* <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      {/* <Outlet context={[ isEditProfileModalOpen, setIsEditProfileModalOpen, user, token, getUserData ]} /> */}
    </Flex>
  );
};

export default Cashflow;
