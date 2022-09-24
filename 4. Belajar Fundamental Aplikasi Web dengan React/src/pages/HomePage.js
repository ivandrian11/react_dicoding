import React from "react";
import { FiPlus } from "react-icons/fi";
import { useSearchParams, Link } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      loading: true,
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
        loading: false,
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    if (this.state.loading) return <h2>Loading....</h2>;

    return (
      <LocaleContext.Consumer>
        {({ locale }) => {
          return (
            <>
              <section className="homepage">
                <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>

                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} placeholder={locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."} />

                <NoteList notes={this.state.keyword ? this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.keyword.toLowerCase())) : this.state.notes} />

                <div className="homepage__action">
                  <Link to="/add">
                    <button className="action" type="button">
                      <FiPlus />
                    </button>
                  </Link>
                </div>
              </section>
            </>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

export default HomePageWrapper;
