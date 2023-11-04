function ReviewDetail({data,lang}) {
  const dataReview = data?.customerReview
  return (
    <div className="content">
      <h3 className="mt-[6vw] uppercase heading-1">Review Detail</h3>
      <div dangerouslySetInnerHTML={{ __html: `${dataReview?.content}`}} className="mt-[2vw]"></div>
      <h4 className="mt-[2vw] text-end">{dataReview?.authorInformation?.name}</h4>
    </div>
  )
}

export default ReviewDetail