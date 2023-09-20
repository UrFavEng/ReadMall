import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useGetBookQuery } from "../store/apiSlice";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
const BookDetails = ({ setCat, setPage }) => {
  const { id } = useParams();

  const { data } = useGetBookQuery(id);
  const details = data?.payload?.book;
  const rout = useNavigate();
  return (
    <div className="pb-[50px]">
      <Navbar setCat={setCat} setPage={setPage} />
      <div className="text-sec capitalize flex flex-col sm:flex-row items-center  gap-[25px] px-[50px] py-[50px]">
        <div className="sm:w-[40%] md:w-[38%] lg:w-[30%] xl:w-[22.5%]">
          <img src={details?.coverUrl} alt="cover book" />
        </div>
        <div className=" sm:w-[45%] md:w-[58%] lg:w-[65%] xl:w-[78.5%] text-center sm:text-left">
          <h1 className="text-[28px] sm:text-[19px] md:text-[24px] lg:text-[28px] xl:text-[34px] tracking-[-1px] md:font-normal lg:font-medium leading-[31px] sm:leading-[23px] md:leading-[26px] lg:leading-[30px] xl:leading-[38px] lg:w-[95%] xl:w-[70%] ">
            {details?.title}
          </h1>
          <h4 className="sm:text-[16px] md:text-[18px] mt-[5px] md:mb-[10px] lg:mb-[30px] xl:mb-[20px] pl-[5px]">
            {details?.subTitle}
          </h4>
          <p className="text-[15px] font-light pl-[5px]">{details?.desc}</p>
          <p
            onClick={() => {
              rout(`/author/${details?.author?.id}`);
            }}
            className="mx-auto sm:mx-0 sm:text-[14px] md:text-[16px]  font-medium pl-[5px] cursor-pointer underline hover:text-main w-fit"
          >
            Author : {details?.author?.authorName}
          </p>
          <p className="text-[16px] font-light  pl-[5px]">
            Language : {details?.lang}
          </p>
          <p className="text-[16px] font-light  pl-[5px]">
            {details?.pages} pages
          </p>
          <p className="text-[16px] font-light  pl-[5px]">
            price : {details?.price ? details?.price : "Free"}
          </p>
          <p
            onClick={() => {
              rout(`/publisher/${details?.publisher?.id}`);
            }}
            className="mx-auto sm:mx-0 sm:text-[14px] md:text-[16px]  font-medium pl-[5px] cursor-pointer underline w-fit hover:text-main"
          >
            Publisher : {details?.publisher?.publisherName}
          </p>
          <div className="flex gap-[8px] pl-[5px] pt-[10px] justify-center sm:justify-start">
            <a
              href={details?.bookUrl}
              download="Example-PDF-document"
              target="_blank"
              rel="noreferrer"
            >
              <button className="py-[5px] px-[8px] bg-main rounded-[8px] text-[14px]">
                Download
              </button>
            </a>
            <button className="py-[5px] px-[8px] bg-main rounded-[8px] text-[14px]">
              Read
            </button>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 sm2:grid-cols-3   md:grid-cols-4 xl:grid-cols-5 gap-4 parentCards px-[20px]">
        <BookCard books={data?.payload?.recommendations} />
      </div>
    </div>
  );
};

export default BookDetails;
