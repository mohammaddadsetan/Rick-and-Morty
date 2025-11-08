interface characterProps {
  params: {
    character: string;
  };
}

export function page({ params }: characterProps) {
  return <div>page</div>;
}
