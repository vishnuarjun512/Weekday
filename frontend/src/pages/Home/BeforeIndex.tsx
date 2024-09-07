import axios from "axios";
import { useEffect } from "react";
import { DataTable } from "./components/TableComponents/CandidateTable";
import { columns } from "./components/TableComponents/columns";

import { convertExcelDate } from "@/lib/excelDateNumbertoDate";
// import { readFromExcelFile } from "@/lib/excelOperations";

import useSheetData from "@/hooks/use-sheet-data";
import usePaginationStore from "@/states/PageState";

const Home = () => {
  const { sheetData, updateSheetData } = useSheetData();
  const { page, limit, setTotalPage } = usePaginationStore();

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      // const excelData = await readFromExcelFile();

      const res = await axios.get(`/api?page=${page}&limit=${limit}`);
      const excelData = res.data.excelData;

      const parsingLinks = excelData.map((singleCandidate: any) => {
        const links = JSON.parse(singleCandidate?.["Scheduling method"]);

        return {
          ...singleCandidate,

          // Convert the "Added On" date
          "Added On":
            typeof singleCandidate["Added On"] === "number"
              ? convertExcelDate(singleCandidate["Added On"])
              : singleCandidate["Added On"],
          Rounds: links,
        };
      });

      setTotalPage(res.data.totalPages);
      updateSheetData(parsingLinks);
    };
    fetchGoogleSheetData();
  }, [page, sheetData]);

  return (
    <div className="">
      {sheetData?.length != 0 ? (
        <div className="flex flex-col w-[100vw]">
          <DataTable columns={columns} data={sheetData} />
        </div>
      ) : (
        <div>No Data Fetched from Google Docs</div>
      )}
    </div>
  );
};

export default Home;
