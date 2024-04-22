import PropTypes from 'prop-types'
import { memo } from 'react';

export function TextFormatter ({ text, role }) {

    const formatText = (input) => {
      const elements = [];
      let cursor = 0;
  
      while (cursor < input.length) {
        if (input[cursor] === '*' && input[cursor + 1] === '*') {
          const end = input.indexOf('**', cursor + 2);
          if (end !== -1) {
            elements.push(<h1 >{input.substring(cursor + 2, end)}</h1>);
            cursor = end + 2;
            continue;
          }
        } else if (input[cursor] === '`') {    
          const end = input.indexOf('`', cursor + 1);
          if (end !== -1) {
            elements.push(<code className='!whitespace-pre bg-black text-white'>{input.substring(cursor + 1, end)}</code>);
            cursor = end + 1;
            continue;
          }
        }
  
        const nextSpecialChar = input.slice(cursor).search(/[*`]/);
        if (nextSpecialChar !== -1) {
          elements.push(input.substring(cursor, cursor + nextSpecialChar));
          cursor += nextSpecialChar;
        } else {
          elements.push(<p >{input.substring(cursor)}</p>);
          break;
        }
      }
  
      return elements;
    };
  
    return (
        <>
        <div className=''>
            {role}
        </div>
        <div>
            {formatText(text)}
        </div>
        </>

    );
};
  
TextFormatter.propTypes = {
text: PropTypes.string.isRequired,
role: PropTypes.string.isRequired
}

export const MemoizedTextFormatter = memo(TextFormatter)
  