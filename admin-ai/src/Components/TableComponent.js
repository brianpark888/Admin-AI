import React from 'react';
import styles from '@/styles/TableComponent.module.css';

const TableComponent = ({ data }) => {
  // data가 없는 경우 빈 배열을 할당하여 오류 방지
  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
