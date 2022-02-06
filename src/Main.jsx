import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";
import Chart from "./Chart";

export default function Main() {
  const [cities, setcities] = useState([]);
  const [selected, setselected] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      headers: {
        "X-API-KEY": "yF1F25Pd4YHaJalYoSJjHvP3hLVfnqmPsFQ31xVy",
      },
    })
      .then((res) => {
        const { result } = res.data;
        setcities(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleCheck(id, checked, name) {
    if (checked) {
      axios({
        method: "get",
        url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
        headers: {
          "X-API-KEY": "yF1F25Pd4YHaJalYoSJjHvP3hLVfnqmPsFQ31xVy",
        },
        params: {
          prefCode: id,
          cityCode: "-",
        },
      }).then((res) => {
        const ans = res.data.result.data[0].data;
        let temp = data;
        if (temp.length > 0) {
          for (let k = 0; k < temp.length; k++) {
            for (let j = 0; j < ans.length; j++) {
              if (ans[j].year === temp[k].year) {
                temp[k][name] = ans[j].value;
              }
            }
          }
        } else {
          for (let j = 0; j < ans.length; j++) {
            ans[j][name] = ans[j]["value"];
          }
          temp = ans;
        }
        setData(temp);
        setselected((arr) => [...arr, { id, name }]);
      });
    } else {
      setselected(selected.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="container">
      <div className="title">
        <h2>日本の人口データ</h2>
      </div>
      <div>
        <Chart props={data} cities={selected} />
      </div>
      <div className="selections">
        <ul>
          {cities.map((city) => (
            <li key={city.prefCode}>
              <div>
                <input
                  type="checkbox"
                  id={city.prefCode}
                  name={city.prefName}
                  onChange={(e) =>
                    handleCheck(e.target.id, e.target.checked, e.target.name)
                  }
                />
                <label>{city.prefName}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
