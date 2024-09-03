const CatchAllPage = ({ params }: { params: { slug: string[] } }) => {
  console.log(params.slug)
  return <div>CatchAllPage</div>
}

export default CatchAllPage
