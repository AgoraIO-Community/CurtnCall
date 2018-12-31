import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withApollo } from "react-apollo";
import { sendShowActions } from "./graphql";
import ShowForm from "./ShowForm";
import Auth from "@aws-amplify/auth";

class ViewShows extends Component {
  state = { showBeingEdited: null };

  render() {
    const { refetch, setAdminView, shows } = this.props;
    const { showBeingEdited } = this.state;
    return (
      <div>
        <h3>View Shows</h3>
        <table>
          <tbody>
            <tr>
              <th />
              <th>Name</th>
              <th>Description</th>
            </tr>
            {shows.map((show, i) => {
              return (
                <tr key={show.id}>
                  <td>
                    <FontAwesomeIcon
                      icon={["far", "edit"]}
                      color="#3490dc"
                      onClick={() => {
                        const { showBeingEdited } = this.state;
                        if (!showBeingEdited) {
                          this.setState({ showBeingEdited: show });
                        } else {
                          this.setState({ showBeingEdited: null });
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={["fas", "times"]}
                      color="#e3342f"
                      onClick={async () => {
                        const { client } = this.props;

                        const currentSession = await Auth.currentSession();

                        const {
                          accessToken: { jwtToken }
                        } = currentSession;

                        await client.mutate({
                          mutation: sendShowActions,
                          variables: {
                            input: {
                              id: show.id,
                              deleteShow: true
                            }
                          },
                          context: {
                            headers: {
                              jwtToken
                            }
                          }
                        });

                        refetch();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={["fas", "check"]}
                      color="#38c172"
                      onClick={async () => {
                        const { client } = this.props;

                        const currentSession = await Auth.currentSession();

                        const {
                          accessToken: { jwtToken }
                        } = currentSession;

                        await client.mutate({
                          mutation: sendShowActions,
                          variables: {
                            input: {
                              id: show.id,
                              finalizeShow: true
                            }
                          },
                          context: {
                            headers: {
                              jwtToken
                            }
                          }
                        });

                        refetch();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td>{show.showName}</td>
                  <td>{show.showDescription}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showBeingEdited && (
          <div>
            <ShowForm
              constants={showBeingEdited}
              refetch={refetch}
              setAdminView={setAdminView}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withApollo(ViewShows);
