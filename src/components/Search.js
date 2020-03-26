// import React, { Component } from "react";

// export class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filtered: []
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       filtered: this.props.plants
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       filtered: nextProps.plants
//     });
//   }

//   handleSearch = e => {
//     let newList = [];

//     if (e.target.value !== "") {
//       newList = this.state.currentList.filter(plant => {
//         const lc = plant.toLowerCase();
//         const filter = e.target.value.toLowerCase();
//         return lc.icludes(filter);
//       });
//     } else {
//       newList = this.state.currentList;
//     }
//     this.setState({
//       filtered: newList
//     });
//   };

//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           className="input"
//           placeholder="Search..."
//           onChange={this.handleSearch}
//         />
//         <ul>
//           {this.state.filtered.map(plant => (
//             <li key={plant}>{plant}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
