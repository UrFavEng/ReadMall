import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AuthorDetails,
  BookDetails,
  Home,
  Login,
  Mainsec,
  PublisherDetails,
  SearchResulte,
  Signin,
  Signup,
} from "./components";
import { useGetBooksQuery, useGetMeQuery } from "./store/apiSlice";
import { useState } from "react";
import HomeCat from "./components/HomeCat";

function App() {
  const { data: tokendetails, error: errorGetMe } = useGetMeQuery();
  const [cat, setCat] = useState("getRecentlyUploaded");
  const [page, setPage] = useState(1);
  const [dataUser, setDataUser] = useState();
  const { data: dataBooks, isLoading: loadingHomePage } = useGetBooksQuery({
    cat,
    page,
  });
  // console.log(dataBooks?.payload);
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainsec setCat={setCat} setPage={setPage} />}>
          <Route
            path="/"
            element={
              <Home
                loadingHomePage={loadingHomePage}
                cat={cat}
                books={dataBooks?.payload?.books}
                maxPage={dataBooks?.payload?.numOfPages}
                setPage={setPage}
                page={page}
                setCat={setCat}
              />
            }
          />
          {/* <Route
            path="/cat/:id"
            element={
              <Home
                loadingHomePage={loadingHomePage}
                cat={cat}
                books={dataBooks?.payload?.books}
                maxPage={dataBooks?.payload?.numOfPages}
                setPage={setPage}
                page={page}
                setCat={setCat}
              />
            }
          /> */}
        </Route>
        <Route
          path="/category/:id"
          element={<HomeCat setCat={setCat} setPage={setPage} />}
        />
        <Route
          path="/book/:id"
          element={<BookDetails setCat={setCat} setPage={setPage} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup setDataUser={setDataUser} />} />
        <Route
          path="/searchresulte/:name"
          element={<SearchResulte setCat={setCat} setPage={setPage} />}
        />
        <Route
          path="/author/:id"
          element={<AuthorDetails setCat={setCat} setPage={setPage} />}
        />
        <Route
          path="/publisher/:id"
          element={<PublisherDetails setCat={setCat} setPage={setPage} />}
        />
      </Routes>
    </>
  );
}

export default App;
