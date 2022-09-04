import { fetchFilters, filterChangeStatus } from '../../reducers/filtersSlice';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const {filters, filter} = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(fetchFilters());
    }, []);


    const btnFilterClass = (filterName) => {
        switch(filterName) {
            case 'Все':
                return 'btn btn-outline-dark'
            case 'Огонь':
                return 'btn btn-danger'
            case 'Вода':
                return 'btn btn-primary'
            case 'Ветер':
                return 'btn btn-success'
            case 'Земля':
                return 'btn btn-secondary'
            default:
                return null
        }
    };

    const btnActiveClass = (activeFilter, filter) => {
       return activeFilter === filter ? ' active' : ''
    }   

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.length > 0
                        ?
                        filters.map(item => {
                            return <button key={v4()} onClick={() => dispatch(filterChangeStatus(item))}  className={`${btnFilterClass(item)}${ btnActiveClass(filter, item)}`}>{item}</button>
                        })
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;