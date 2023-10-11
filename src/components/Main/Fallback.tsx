export default function Fallback() {
  return (
    <div className='absolute flex h-full w-full shrink items-center justify-center bg-slate-950 p-3 md:static'>
      <div className='font-sans text-2xl capitalize text-white font-semibold'>Loading...</div>
    </div>
  )
}
