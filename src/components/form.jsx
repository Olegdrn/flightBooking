import './style/form.css';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { UseFilter } from './hooks/useFilter';

export default function Form({ setData, airCompanies }) {

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    setData(data)
  }

  return (
    <form className='form' onChange={handleSubmit(onSubmit)}>

      <div className="formContainer">
        <div className='formTitle'>
          <h4 className='label'>Сортировать</h4>
          <label htmlFor="drop" className='dropBlock'>
            <input type="button" onClick={(data) => {
              reset()
              setData(data)
            }}
              id="drop"
              className='drop'
            />Сбросить</label>
        </div>
        <div className="checkpoint">
          <input className='checkboxInput'
            type='radio'
            {...register('sort')}
            name='sort'
            value='upPrice'
          />
          <p>- По возрастанию цены</p>
        </div>
        <div className="checkpoint">
          <input
            type='radio'
            {...register('sort')}
            value='dropPrice'
          />
          <p>- По убыванию цены</p>
        </div>
        <div className="checkpoint">
          <input
            type='radio'
            {...register('sort')}
            value='time'
          />
          <p>- По времени в пути</p>
        </div>
        <h4 className='label'>Фильтровать</h4>
        <div>
          <div className="checkpoint_filt">
            <input
              type='radio'
              {...register('transfer')}
              id='transfer'
              value="transfer"
              className='specInput'
            />
            <label htmlFor="transfer" className='specLabel'>&nbsp;- 1 пересадка</label>
          </div>
          <div className="checkpoint_filt">
            <input
              type='radio'
              {...register('transfer')}
              id='withoutTransfer'
              value="withoutTransfer"
              className='specInput'
            />
            <label htmlFor="withoutTransfer" className='specLabel'>&nbsp;- без пересадок</label>
          </div>
        </div>
        <h4 className='label'>Цена</h4>
        <label htmlFor='minPrice'>От</label>
        <input className='input' type="number" placeholder="0" id='minPrice' {...register('minPrice')} />
        <label htmlFor='maxPrice'>До</label>
        <input className='input' type="number" placeholder="10000000" id='maxPrice' {...register('maxPrice')} />
        <h4 className='labelAvia'>Авиакомпании</h4>
        <div className="checkpoint_filt">
          <input
            type='radio'
            {...register('company')}
            id='firstCompany'
            value="Aeroflot"
            className='specInput'
          />
          <label htmlFor="firstCompany" className='specLabel'>&nbsp;- {airCompanies[22]}</label>
        </div>
        <div className="checkpoint_filt">
          <input
            type='radio'
            {...register('company')}
            id='secondCompany'
            value="Air France"
            className='specInput'
          />
          <label htmlFor="secondCompany" className='specLabel'>&nbsp;- {airCompanies[8]}</label>
        </div>
      </div>
    </form>
  )
}