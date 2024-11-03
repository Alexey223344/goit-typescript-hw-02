import toast, { Toaster } from "react-hot-toast";
import { fetchArticles } from "./services/api";
import React, { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { ApiImage, ModalOpenData } from "./types";

const  App: React.FC=()=> {
  const [searchValue, setSearchValue] = useState<string>("");
  const [dataImage, setDataImage] = useState<ApiImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [getErr, setGetErr] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<ModalOpenData>({
    name: "",
    url: "",
  });

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const getData = async ():Promise<void> => {
      try {
        setGetErr(false);
        setIsLoader(true);
        const data = await fetchArticles(page, searchValue);
        setDataImage((prev) => [...prev, ...data.results]);
        setMaxPage(data.total_pages);
        if (data.total_pages === 0) {
          getNotFaundData();
        }
      } catch {
        setGetErr(true);
      } finally {
        setIsLoader(false);
      }
    };
    getData();
  }, [page, searchValue]);

  function openModal(imgUrl: ModalOpenData):void {
    setImageModal(imgUrl);
    setIsOpenModal(true);
  }

  function closeModal():void {
    setIsOpenModal(false);
  }

  const getNotFaundData = () => {
    return toast("The data for your request was not found", {
      icon: "😥",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const getSubmitValue = (value:string):void => {
    setSearchValue(value);
    setDataImage([]);
    setPage(1);
  };

  const getLoadMoreImg = ():void => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={getSubmitValue} />
      {isLoader && <Loader />}
      {dataImage.length > 0 && (
        <ImageGallery dataImage={dataImage} openModal={openModal} />
      )}
      {dataImage.length > 0 && maxPage > page && (
        <LoadMoreBtn loadMore={getLoadMoreImg} />
      )}
      {getErr && <ErrorMessage />}
      <ImageModal
        modalIsOpen={isOpenModal}
        closeModal={closeModal}
        imageModal={imageModal}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
