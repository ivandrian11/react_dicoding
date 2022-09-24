import React from "react";
import NoteDetail from "../components/NoteDetail";
import { useParams, useNavigate } from "react-router-dom";
import { archiveNote, unarchiveNote, deleteNote, getNote } from "../utils/network-data";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      loading: true,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.move = this.move.bind(this);
  }

  async componentDidMount() {
    const { error, data } = await getNote(this.props.id);

    if (error) this.props.navigate("*");
    else
      this.setState(() => {
        return {
          note: data,
          loading: false,
        };
      });
  }

  onDeleteHandler(id) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id).then(() => {
          MySwal.fire("Terhapus!", "Catatan berhasil dihapus!", "success");
          this.props.navigate("/");
        });
      }
    });
  }

  async move(id, archived) {
    if (archived) {
      await unarchiveNote(id);
      this.props.navigate("/");
    } else {
      await archiveNote(id);
      this.props.navigate("/archive");
    }
  }

  render() {
    if (this.state.loading) return <h2>Loading....</h2>;

    return (
      <section>
        <NoteDetail {...this.state.note} onDelete={this.onDeleteHandler} move={this.move} />
      </section>
    );
  }
}

export default DetailPageWrapper;
