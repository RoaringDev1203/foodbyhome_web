import { Link } from 'react-router-dom'
import { LuFacebook, LuInstagram, LuPhone } from 'react-icons/lu'
import { type IconType } from 'react-icons'
import { FaXTwitter } from 'react-icons/fa6'
import SubscribeToMail from './SubscribeToMail'
import { FOOTER_LINKS } from '@/assets/data'

const FooterLinks = () => {
  return (
    <div className="border-t border-default-200">
      <div className="container">
        <div className="grid items-center gap-6 py-6 lg:grid-cols-3 lg:py-10">
          <div className="lg:col-span-2">
            <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              {Object.keys(FOOTER_LINKS).map((title, idx) => {
                return (
                  <div className="flex flex-col gap-3" key={title + idx}>
                    <h5 className="mb-3 font-semibold text-default-950">{title}</h5>
                    {FOOTER_LINKS[title].map((item, idx) => (
                      <div className="text-default-600" key={item.name + idx}>
                        <Link to={item.link ?? ''}>{item.name}</Link>
                      </div>
                    ))}
                  </div>
                )
              })}

              <div className="flex flex-col gap-3">
                <h5 className="mb-3 font-semibold text-default-950">Get in touch</h5>
                <div className="text-default-600">
                  <Link to="mailto:info@foodbyhome.dk">info@foodbyhome.dk</Link>
                </div>
                <div className="flex items-center gap-4">
                  {[LuFacebook, LuInstagram].map((icon, idx) => {
                    const Icon: IconType = icon
                    const link = idx == 0 ? '' : '';
                    return (
                      <Link key={idx} to={link} className="cursor-pointer">
                        <Icon size={24} className="text-default-600 transition-all hover:text-primary" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <SubscribeToMail />
        </div>
      </div>
    </div>
  )
}

export default FooterLinks
