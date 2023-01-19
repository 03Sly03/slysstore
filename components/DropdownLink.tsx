import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  children: string;
};

function DropdownLink(props: Props) {
  let { href, children, ...rest } = props;
  return (
    <Link className="dropdown-link" href={href} {...rest}>
      {children}
    </Link>
  );
}

export default DropdownLink;
