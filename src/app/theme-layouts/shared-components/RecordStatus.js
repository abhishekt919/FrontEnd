import _ from '@lodash';
import clsx from 'clsx';

export const statuses = [
  {
    name: 'YES',
    color: 'bg-green text-white',
  },
  {
    name: 'NO',
    color: 'bg-red text-white',
  },
  {
    name: 'VERIFIED',
    color: 'bg-green text-white',
  },
  {
    name: 'UNVERIFIED',
    color: 'bg-red text-white',
  },
  {
    name: 'UNPAID',
    color: 'bg-red text-white',
  },
  {
    name: 'PAID',
    color: 'bg-green text-white',
  },
  {
    name: 'ACTIVE',
    color: 'bg-green text-white',
  },
  {
    name: 'INACTIVE',
    color: 'bg-red text-white',
  },
  {
    name: 'INVITED',
    color: 'bg-blue text-white',
  },
  {
    name: 'DELETED',
    color: 'bg-red text-white',
  },
  {
    name: 'FAIL',
    color: 'bg-red text-white',
  },
  {
    name: 'PARTIAL',
    color: 'bg-blue text-white',
  },
  {
    name: 'REJECT',
    color: 'bg-red text-white',
  }, {
    name: 'DENOM',
    color: 'bg-blue text-white',
  },
  {
    name: 'Available',
    color: 'bg-red text-white',
  }, {
    name: 'Unavailable',
    color: 'bg-red text-white',
  }
];

function RecordStatus(props) {
  return (
    <div
      className={clsx(
        'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
        _.find(statuses, { name: props.name })?.color
      )}
    >
      {props.name}
    </div>
  );
}

export default RecordStatus;
