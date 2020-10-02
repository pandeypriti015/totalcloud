import React from 'react';
import '../loader.scss'
import GridList from './gridlist'

import './userList.scss'

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            sortedList:[]
        }
    }

    componentDidMount() {
        let url = "https://reqres.in/api/users?delay=1"
        fetch(url, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => { return res.json() }
            )
            .then((response, error) => {
                console.log(response)
                this.setState({ userData: response.data,sortedList:response.data })

            })
            .catch((error) => console.log(error))

    }
    handleChange = (e) => {
        let userList=JSON.parse(JSON.stringify(this.state.userData))
        if(e.target.value=="none"){
            this.setState({sortedList:userList})
        }
        else if(e.target.value=="first"){
            let sorted = userList.sort((a,b)=>{return a.first_name.localeCompare(b.first_name)})
            this.setState({sortedList:sorted})
        }
        else if(e.target.value=="last"){
            let sorted = userList.sort((a,b)=>{return a.last_name.localeCompare(b.last_name)})
            this.setState({sortedList:sorted})  
        }
    }

   

    render() {
        const { sortedList } = this.state
        return (
            <div>
                {sortedList.length > 0 ?
                    <div>

                        <div className="grid-list">
                            <div className='option-list'>
                                <div>
                                    <label>Sort By&nbsp;&nbsp;</label>
                                    <select onChange={(e) => this.handleChange(e)}>
                                        <option value="none">None</option>
                                        <option value="first">First Name</option>
                                        <option value="last">Last Name</option>
                                    </select>
                                </div>
                            </div>
                            <GridList data={this.state.sortedList}></GridList>
                        </div></div> : <div className="page-loader after-loading">
                        <h3>LOADING ...</h3>
                        <div className="lds-default">
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>}
                   
            </div>
        )
    }
}

export default UserList;
