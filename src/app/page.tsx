"use client";

import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [advocates, setAdvocates] = useState<AdvocateEntity[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateEntity[]>(
    []
  );

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm) ||
        !!advocate.specialties.find((s) =>
          s.toLowerCase().includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onReset = () => {
    console.log(advocates);
    setSearchInput("");
    setFilteredAdvocates(advocates);
  };

  const onSearch = () => {};

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchInput}</span>
        </p>
        <input
          type="text"
          style={{ border: "1px solid black" }}
          value={searchInput}
          onChange={onChange}
        />
        <button onClick={onReset}>Reset</button>
        <button onClick={onSearch}>Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={`${advocate.id}-${index}`}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((specialty, i) => (
                    <div key={`${specialty}-${i}`}>{specialty}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
