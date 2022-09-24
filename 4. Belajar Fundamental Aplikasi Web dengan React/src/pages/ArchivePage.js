import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArchivePage extends React.Component {
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
    const { data } = await getArchivedNotes();

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
              <section className="archives-page">
                <h2>{locale === "id" ? "Catatan Arsip" : "Archived Note"}</h2>

                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} placeholder={locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."} />

                <NoteList notes={this.state.keyword ? this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.keyword.toLowerCase())) : this.state.notes} />
              </section>
            </>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

export default ArchivePageWrapper;
