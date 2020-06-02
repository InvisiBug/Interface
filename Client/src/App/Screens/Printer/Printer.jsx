// Components
import React from "react";

class Printer extends React.Component {
  render() {
    return (
      <div>
        <object>
          <embed src={"http://192.168.1.47"} className="printer" />
        </object>
      </div>
    );
  }
}

export default Printer;
