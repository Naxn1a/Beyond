import React from 'react'
import Navbar from '@/components/navbar'
import '../home/home.css'
import NavData from '@/data/navbar.json';

export default function Home() {
  return (
    <div>
      {NavData.map((item: NavData, index: number) => (
        <Navbar
          key={index}
          title='HOME'
          link={item.link}
          path={item.path} />))}
      <h1>Welcome to Home 🏠</h1>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, distinctio labore incidunt hic quam reprehenderit! Iste dolor magni ab repellendus quibusdam id aliquid eos, officia odit obcaecati iure quasi omnis?</h2>
      <div className='ml-20'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequatur, id obcaecati eaque, exercitationem aperiam nobis recusandae voluptatem vero, esse natus? Omnis, dolor repellendus. Molestiae temporibus modi provident iure accusantium.</p>
      </div>
    </div>
  )
}
