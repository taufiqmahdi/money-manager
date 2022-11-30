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
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Cashflow = () => {
  const [user] = useOutletContext();
  // console.log(user)

  const [cashflowContent, setCashflowContent] = useState([{}]);

  // console.log('awa', cashflowContent)

  // const getCashflowContent = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   // var raw = JSON.stringify({
  //   //   email: user.email,
  //   //   token: user.token,
  //   // });

  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   const response = await fetch("http://localhost:4001/wtf", requestOptions)
  //   // response.then(console.log(response.json()))
  //   const data = await response.json();
  //   // setCashflowContent(data);
  //   return data;

  //   // try {
  //   //   let data = await response.json();
  //   //   // console.log(data[0]);
  //   //   // setUser(data);
  //   //   // localStorage.setItem("user", JSON.stringify(data));
  //   //   // setIsLoggedIn(true);
  //   //   return data;
  //   //   // setCashflowContent(data);
  //   //   // console.log('data: ', data);
  //   //   // console.log('cashflow data: ', cashflowContent);
  //   // } catch (error) {
  //   //   // setIsError(true);
  //   //   console.log(error);
  //   // }
  // };

  useEffect(() => {
    // let data = getCashflowContent();
    // const getData = async () => {
    //   return await getCashflowContent();
    // };

    // console.log('getData: ', getData())
    // const data = getData();

    const getCashflowContent = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: user.email,
        token: user.token,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:4001/cashflow",
        requestOptions
      );
      // response.then(console.log(response.json()))
      const data = await response.json();
      // console.log('data', data)
      // console.log('deati', cashflowContent[0].detail)
      setCashflowContent(data);
      // console.log(cashflowContent[1].id)
      // return data;

      // try {
      //   let data = await response.json();
      //   // console.log(data[0]);
      //   // setUser(data);
      //   // localStorage.setItem("user", JSON.stringify(data));
      //   // setIsLoggedIn(true);
      //   return data;
      //   // setCashflowContent(data);
      //   // console.log('data: ', data);
      //   // console.log('cashflow data: ', cashflowContent);
      // } catch (error) {
      //   // setIsError(true);
      //   console.log(error);
      // }
    };

    getCashflowContent();

    // let data = getCashflowContent();

    // console.log('data:', data)

    // console.log('data: ', data)
    // setCashflowContent(data);
    // console.log(getCashflowContent())

    // setCashflowContent(() => getCashflowContent);
    // console.log("data: ", data);
    // console.log("cashflow data: ", data);
    // eslint-disable-next-line
  }, []);

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
