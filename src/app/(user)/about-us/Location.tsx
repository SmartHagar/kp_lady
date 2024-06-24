/** @format */

type Props = {};

const Location = (props: Props) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl mt-10 mb-2 text-center">Lokasi</h1>
      <p>
        Terminal 12 Holtekamp terletak di tepi Pantai Holtekamp, yang terkenal
        dengan pasir hitamnya yang halus dan airnya yang jernih
      </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.6150845796033!2d140.76650916973307!3d-2.630213968932134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x686c5d000a4fd919%3A0x1130eb5b90d71d18!2sTerminal%2012%20Holtekamp!5e0!3m2!1sid!2sid!4v1719259960657!5m2!1sid!2sid"
        className="w-full h-96 md:h-[26rem]"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Location;
