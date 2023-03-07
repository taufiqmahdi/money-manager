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
  const API_URL = "http://localhost:4001/api/cashflows/";
  const [user] = useOutletContext();
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
  };

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

    const response = await fetch(API_URL + "cashflow", requestOptions);
    const data = await response.json();
    setCashflowContent(data);
  };

  useEffect(() => {
    filterCashflow();
    // eslint-disable-next-line
  }, [initialFilterState]);

  return (
    <Flex direction="column" w="100%">
      <Flex mb="25px">
        <Heading as="h2" size="md">
          Cashflow
        </Heading>
      </Flex>
      <Flex
        w="100%"
        bgColor="white"
        boxShadow="lg"
        p="25px"
        borderRadius="8px"
        direction="column"
      >
        <Flex
          className="filter-cashflow"
          mb="25px"
          gap={{ base: "10px", sm: "0" }}
          direction={{ base: "column", sm: "row" }}
        >
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
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign="center">Date</Th>
                <Th textAlign="center">Detail</Th>
                <Th textAlign="center">Cashflow Type</Th>
                <Th textAlign="center">Cashflow Type Detail</Th>
                <Th textAlign="center">Amount</Th>
                <Th textAlign="center">Description</Th>
                <Th textAlign="center">Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cashflowContent.map((cashflowContent) => (
                <Tr key={[cashflowContent._id]}>
                  <Td className="date">{cashflowContent.date}</Td>
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
                  <Td className="balance" isNumeric>
                    Rp {cashflowContent.balance}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default Cashflow;
