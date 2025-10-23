import { test as base, expect } from "@playwright/test";
import custom from "./demoAutomationTesting/CustomTasks";
import playg from "./qaPlayGround/Qaplaytasks";
import scre from "./screenerApp/screenerPage";
import Playgcolour from "./tmPlayGround/playGroundCol";
import DynamicTableExportPDFPage from "./tmPlayGround/DynamicTableExportPDFPage";
import StaticTablePDFPage from "./tmPlayGround/StaticTablePDFPage";
import StaticTablePage from "./tmPlayGround/staticPage";
import DynamicTableExportPage from "./tmPlayGround/dynamicPage";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

type MyFixtures = {
  custom: custom;
  playg: playg;
  scre: scre;
  playgco:Playgcolour
  pdfPage:DynamicTableExportPDFPage
  pdfPageE:StaticTablePDFPage
  staticTablePage:StaticTablePage
  tablePage:DynamicTableExportPage
};

const test = base.extend<MyFixtures>({
  custom: async ({ page }, use) => {
    await use(new custom(page));
  },
  playg: async ({ page }, use) => {
    await use(new playg(page));
  },
  scre: async ({ page }, use) => {
    await use(new scre(page));
  },
  playgco:async({page},use)=>{
    await use(new Playgcolour(page))
  },
  pdfPage:async({page},use)=>
  {
    await use(new DynamicTableExportPDFPage(page))
  },
  pdfPageE:async({page},use)=>
  {
    await use(new StaticTablePDFPage(page))
  },
  staticTablePage:async({page},use)=>
  {
    await use(new StaticTablePage(page))
  },
  tablePage:async({page},use)=>
  {
    await use(new DynamicTableExportPage(page))
  }
});

export { test, expect,fs,path,XLSX};
