/* eslint-disable jsx-a11y/control-has-associated-label */

const ChainRow = ({ symbol, amount }) => (
  <tr className="text-center bg-white text-black">
    <td /> {/* Empty cell for the rank */}
    <td>
      {symbol}: {amount}ETH
    </td>
    <td /> {/* Empty cell for the address */}
  </tr>
)

export default ChainRow
