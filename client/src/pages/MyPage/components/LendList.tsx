import { useState, useEffect } from 'react';
import Paging from './Paging';
import axios from 'axios';

function LendList() {
  const [lendList, setLendList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/api/reservations/products/${products-id}',
        ); // 실제 API 엔드포인트에 맞게 수정
        setLendList(response.data);
      } catch (error) {
        console.error('Error fetching lend list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      빌려준 내역:
      {/* {lendList.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))} */}
      <Paging
        currentPage={1}
        onPageChange={(page) => console.log('Page changed:', page)}
        itemsPerPage={5}
        totalItemsCount={lendList.length}
      />
    </div>
  );
}
        
export default LendList;
