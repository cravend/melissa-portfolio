import blockContent from './objects/blockContent'
import simpleBlockContent from './objects/simpleBlockContent'
import book from './documents/lists/book'
import poll from './documents/lists/poll'
import post from './documents/lists/post'
import resource from './documents/lists/resource'
import tour from './documents/lists/tour'
import authorPage from './documents/pages/authorPage'
import contactPage from './documents/pages/contactPage'
import fulbrightPage from './documents/pages/fulbrightPage'
import kidsCornerPage from './documents/pages/kidsCornerPage'
import siteSettings from './documents/pages/siteSettings'
import travelPage from './documents/pages/travelPage'

const listDocuments = [post, resource, tour, poll, book]
const pageConfig = [siteSettings, travelPage, fulbrightPage, kidsCornerPage, authorPage, contactPage]

export const schemaTypes = [...listDocuments, ...pageConfig, blockContent, simpleBlockContent]
