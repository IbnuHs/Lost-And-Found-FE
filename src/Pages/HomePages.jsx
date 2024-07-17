import React from "react";
import Jumbotron from "../Layouts/Jumbotron";
import Problem from "../Layouts/Problem";
import ListComponents from "../Layouts/ListComponents";

export default function HomePages() {
  return (
    <>
      <Jumbotron />
      <Problem />
      <ListComponents />
    </>
  );
}
