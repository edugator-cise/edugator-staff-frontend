import React from 'react';
import { InferGetStaticPropsType } from "next";
import apiClient from "../src/app/common/apiClient";
import LandingFeatures from "../src/pages/LandingPage/LandingFeatures";
import LandingHome from "../src/pages/LandingPage/LandingHome";
import LandingTopics from "../src/pages/LandingPage/LandingTopics";
import { IModuleBase } from "../src/shared/types";
import VerticalNavigation from "../src/shared/VerticalNavigation";
import '../styles/App.module.css'

function LandingPage({modules}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <>
      <VerticalNavigation light modules={modules.map(value => value.name)}></VerticalNavigation>
      <LandingHome />
      <LandingFeatures />
      <LandingTopics />
    </>
  )
}

export const getServerSideProps = async () => {
  const { data }: { data: IModuleBase[]} = await apiClient.get("v1/module");
  const sortedModules = data.sort(
    (valueA, valueB) => valueA.number - valueB.number
  )
  return {
    props: {
      modules: sortedModules
    }
  }
}
export default LandingPage;