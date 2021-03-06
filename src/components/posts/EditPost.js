import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePost, getPost } from '../../actions/postsActions';

class CreateForm extends Component {
  state = {
    title: '',
    content: '',
    errors: {}
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.post.post) {
      const post = nextProps.post.post;

      post.title = post.title ? post.title : '';
      post.content = post.content ? post.content : '';

      this.setState({
        title: post.title,
        content: post.content
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const post = {
      title: this.state.title,
      content: this.state.content
    };

    this.props.updatePost(this.props.match.params.id, post, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Post</h1>
                <p className="lead text-center">Post something</p>

                {Object.keys(errors).length > 0 ? (
                  <div className="row">
                    <div className="col-md-12 alert alert-danger">
                      {errors.map((error, i) => (
                        <li key={i}>{error.msg}</li>
                      ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Content</label>
                    <textarea
                      className="form-control"
                      name="content"
                      placeholder="Content..."
                      rows="6"
                      value={this.state.content}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatePost, getPost }
)(withRouter(CreateForm));
