
import  { ChangeEvent, useEffect, useState } from 'react'
import {FaCaretDown} from 'react-icons/fa'

type Props<T extends Record<string, unknown>> = {
    items: T[],
    idKey: keyof T,
    nameKey: keyof T,
    codeKey: keyof T,
    onItemSelect: (id: T[keyof T] | null) => void;
    searchLabel: string;
    hasLabel:boolean
    clear:boolean
    required:boolean
    disabled?:boolean
    selected?:any
}

const LookupDropdown = <T extends Record<string,unknown>>({
    items,
    idKey,
    nameKey,
    codeKey,
    onItemSelect,
    searchLabel,
    hasLabel,
    clear,
    required,
    disabled,
    selected,
  }: Props<T>) => {

      const [isOpen, setIsOpen] = useState(false);
      const [selectedItem, setSelectedItem] = useState<T[keyof T] | null>(null);
      const [filteredItems, setFilteredItems] = useState(items);
      const [inputValue, setInputValue] = useState('');

      const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
      };
      const handleItemClick = (item: T | null) => {
        if (item) {
          const id = item[idKey];
          setSelectedItem(id);
          console.log(selectedItem)
          setInputValue(`${item[codeKey] ?? ''} - ${item[nameKey] ?? ''}`);
          onItemSelect(id);
        } else {
          setSelectedItem(null);
          setInputValue('');
        }
        setIsOpen(false);
      };

      const fillFiltered = () =>{
          const filtered = items.filter(item =>
              `${item[codeKey] ?? ''} ${item[nameKey] ?? ''}`.toLowerCase()
            );
          //console.log(filtered)
          setFilteredItems(filtered);
      }

      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    
        const filtered = items.filter(item =>
          `${item[codeKey] ?? ''} ${item[nameKey] ?? ''}`.toLowerCase().includes(value.toLowerCase())
        );
    
        setFilteredItems(filtered);
      };
    
      const handleClearInput = () => {
        setInputValue('');
        setFilteredItems(items);
        setSelectedItem(null);
        onItemSelect(null);
        setIsOpen(false)
      };
    
      const handleMouseLeave = () => {
        setIsOpen(false);
      };
    
      useEffect(()=>{
        fillFiltered()
      },[items])

      useEffect(()=>{
        if (clear===true) {
          handleClearInput()
          fillFiltered()
        }
      },[clear])

      useEffect(()=>{
        if (selected){
          const id = selected[idKey];
          setSelectedItem(id);
          setInputValue(`${selected[codeKey] ?? ''} - ${selected[nameKey] ?? ''}`);
        }
      },[selected])


  return (
    <div className="w-full text-sm">
      <div className="w-full relative text-sm">
        {hasLabel && 
        <div className='flex'>
          <label className="block text-gray-700 text-sm font-bold my-2" >  
                  {searchLabel}
          </label>            
          <label className="block text-red-700 text-sm font-bold my-2" >  
                  {required && ' * '}
          </label>            
        </div>
        }
        <div className="w-full flex items-center">
          <div
            className="w-full text-gray-500 h-16 place-content-center cursor-pointer shadow appearance-none border rounded-lg py-2 px-3 bg-slate-100 leading-tight focus:outline-none focus:shadow-outline"
            onClick={handleToggleDropdown}
          >
            {inputValue || `جستجو با ${searchLabel} ...`}
          </div>
          {inputValue && (
              <button
              className="absolute left-2 transform -translate-y-3/4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleClearInput}
            >
              &#x2715; {/* This is a simple "X" icon */}
            </button>
          )}
          <div className="absolute left-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <FaCaretDown />
          </div>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg"
          onMouseLeave={handleMouseLeave}>
            <input
              type="text"
              className="block w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:ring-0"
              placeholder={`جستجو با ${searchLabel} ...`}
              value={inputValue}
              onChange={handleInputChange}
              required={required}
              disabled={disabled}
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div
                    key={String(item[idKey])}
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer py-2 px-3 hover:bg-gray-100 flex justify-between"
                  >
                    <span className="text-xs w-1/2">{String(item[codeKey] ?? '')}</span>
                    <span className="text-xs w-1/2">{String(item[nameKey] ?? '')}</span>
                  </div>
                ))
              ) : (
                <div className="py-2 px-3 text-gray-500">موردی یافت نشد.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LookupDropdown
	
